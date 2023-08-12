import { authMiddleware } from "@clerk/nextjs";
export default authMiddleware({
  publicRoutes: ["/", "/faq", "/404"],
});

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
