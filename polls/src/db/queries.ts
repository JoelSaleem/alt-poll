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
    RETURNING *
`;

export const GET_OPTIONS = `
    SELECT * FROM "Options"
    WHERE user_id = ? AND poll_id = ?
`;

export const GET_OPTION = `
    SELECT * FROM "Options"
    WHERE user_id = ? AND poll_id = ? AND id = ?
    LIMIT 1
`;

export const CREATE_OPTION = `
    INSERT INTO "Options"(title, description, poll_id, user_id)
    VALUES(?, ?, ?, ?)
    RETURNING *
`;

export const GET_OTP_BY_VALUE = `
    SELECT * FROM "Otps" o
    JOIN "Polls" po on po.id = o.poll_id
    WHERE o.id = ?
`;

export const CREATE_OTP = `
    INSERT INTO "Otps"(id, expiry, poll_id, user_id, version)
    VALUES(?, ?, ?, ?, ?)
    RETURNING *
`;