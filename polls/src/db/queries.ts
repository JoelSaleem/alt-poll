export const GET_USER_BY_ID = `
    SELECT * FROM "Users"
    WHERE id = $1
    LIMIT 1
`;

export const CREATE_USER = `
    INSERT INTO "Users"(id, name, google_id, created_at)
    VALUES($1, $2, $3, $4)
`;
