export const GET_USER_BY_ID = `
    SELECT * FROM "Users"
    WHERE id = ?
    LIMIT 1
`;

export const CREATE_USER = `
    INSERT INTO "Users"(id, name, google_id, created_at)
    VALUES(?, ?, ?, ?)
`;

export const GET_POLLS = `
    SELECT * FROM "Polls"
    WHERE user_id = ?
`;

export const GET_POLL = `
    SELECT * FROM "Polls"
    WHERE user_id = ? AND id = ?
`;

export const CREATE_POLL = `
    INSERT INTO "Polls"(title, description, user_id)
    VALUES(?, ?, ?)
`;
