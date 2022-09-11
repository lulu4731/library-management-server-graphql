import { JwtPayload } from "jsonwebtoken";

export type LibrarianAuthPayload = JwtPayload & { userId: string }