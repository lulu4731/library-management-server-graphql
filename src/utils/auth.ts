import { Secret, sign } from "jsonwebtoken";
import { Librarian } from "src/entities/Librarian";

export const createToken = (user: Librarian) => sign(
    {
        userId: user.id_librarian
    },
    process.env.ACCESS_TOKEN_SECRET as Secret,
    {
        expiresIn: '15d'
    }
)