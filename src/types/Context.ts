import { Request, Response } from "express";
import { LibrarianAuthPayload } from "./LibrarianAuthPayload";

export interface Context {
    req: Request
    res: Response
    librarian: LibrarianAuthPayload
}