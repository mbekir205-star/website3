import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, router, protectedProcedure } from "./_core/trpc";
import { createConsultationBooking, getConsultationBookings, getConsultationBookingById, updateConsultationBookingStatus } from "./db";
import type { InsertConsultationBooking } from "../drizzle/schema";
import { z } from "zod";
import { TRPCError } from "@trpc/server";

export const appRouter = router({
    // if you need to use socket.io, read and register route in server/_core/index.ts, all api should start with '/api/' so that the gateway can route correctly
  system: systemRouter,
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return {
        success: true,
      } as const;
    }),
  }),

  consultations: router({
    create: publicProcedure
      .input(z.object({
        name: z.string().min(1),
        email: z.string().email(),
        phone: z.string().min(10),
        company: z.string().optional(),
        serviceType: z.string().min(1),
        budget: z.string().optional(),
        message: z.string().optional(),
        preferredDate: z.string().optional(),
        preferredTime: z.string().optional(),
      }))
      .mutation(async ({ input }) => {
        try {
          const result = await createConsultationBooking({
            name: input.name,
            email: input.email,
            phone: input.phone,
            company: input.company || null,
            serviceType: input.serviceType,
            budget: input.budget || null,
            message: input.message || null,
            preferredDate: input.preferredDate || null,
            preferredTime: input.preferredTime || null,
            status: 'pending',
          });
          return { success: true, id: (result as any).insertId };
        } catch (error) {
          console.error("Failed to create consultation booking:", error);
          throw new TRPCError({
            code: 'INTERNAL_SERVER_ERROR',
            message: 'Failed to create consultation booking',
          });
        }
      }),
    
    list: protectedProcedure
      .input(z.object({
        limit: z.number().optional(),
        offset: z.number().optional(),
      }).optional())
      .query(async ({ ctx, input }) => {
        if (ctx.user?.role !== 'admin') {
          throw new TRPCError({
            code: 'FORBIDDEN',
            message: 'Only admins can view bookings',
          });
        }
        
        try {
          const bookings = await getConsultationBookings(input?.limit, input?.offset);
          return bookings;
        } catch (error) {
          console.error("Failed to fetch consultation bookings:", error);
          throw new TRPCError({
            code: 'INTERNAL_SERVER_ERROR',
            message: 'Failed to fetch bookings',
          });
        }
      }),
    
    getById: protectedProcedure
      .input(z.number())
      .query(async ({ ctx, input }) => {
        if (ctx.user?.role !== 'admin') {
          throw new TRPCError({
            code: 'FORBIDDEN',
            message: 'Only admins can view bookings',
          });
        }
        
        try {
          const booking = await getConsultationBookingById(input);
          return booking;
        } catch (error) {
          console.error("Failed to fetch consultation booking:", error);
          throw new TRPCError({
            code: 'INTERNAL_SERVER_ERROR',
            message: 'Failed to fetch booking',
          });
        }
      }),
    
    updateStatus: protectedProcedure
      .input(z.object({
        id: z.number(),
        status: z.enum(['pending', 'confirmed', 'completed', 'cancelled']),
      }))
      .mutation(async ({ ctx, input }) => {
        if (ctx.user?.role !== 'admin') {
          throw new TRPCError({
            code: 'FORBIDDEN',
            message: 'Only admins can update bookings',
          });
        }
        
        try {
          await updateConsultationBookingStatus(input.id, input.status);
          return { success: true };
        } catch (error) {
          console.error("Failed to update consultation booking:", error);
          throw new TRPCError({
            code: 'INTERNAL_SERVER_ERROR',
            message: 'Failed to update booking',
          });
        }
      }),
  }),

  // TODO: add feature routers here, e.g.
  // todo: router({
  //   list: protectedProcedure.query(({ ctx }) =>
  //     db.getUserTodos(ctx.user.id)
  //   ),
  // }),
});

export type AppRouter = typeof appRouter;
