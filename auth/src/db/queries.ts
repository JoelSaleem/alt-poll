export const GET_USER_BY_ID = `
    SELECT * FROM "Users"
    WHERE id = $1
    LIMIT 1
`;

export const GET_USER_BY_GOOGLE_ID = `
    SELECT * FROM "Users"
    WHERE google_id = $1
    LIMIT 1
`;

export const CREATE_USER = `
    INSERT INTO "Users"(name, google_id)
    VALUES($1, $2)
`;
