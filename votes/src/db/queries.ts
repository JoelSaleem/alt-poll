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
    INSERT INTO "Polls"(id, title, description, user_id, open, closed, created_at)
    VALUES(?, ?, ?, ?, ?, ?, ?)
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
    INSERT INTO "Options"(id, created_at, title, description, poll_id, user_id)
    VALUES(?, ?, ?, ?, ?, ?)
    RETURNING *
`;

export const GET_VOTES = `
SELECT * FROM "Votes"
WHERE user_id = ? AND poll_id = ?
`;

export const GET_VOTE = `
SELECT * FROM "Votes"
WHERE user_id = ? AND id = ?
`;

export const CREATE_VOTE = `
    INSERT INTO "Votes"(user_id, poll_id, option_id, rank)
    VALUES(?, ?, ?, ?)
    RETURNING *
`;

export const GET_OTP_BY_VALUE = `
    SELECT *, o.id as otp_id FROM "Otps" o
    JOIN "Polls" po on po.id = o.poll_id
    WHERE o.id = ? AND expired = false
`;

export const CREATE_OTP = `
    INSERT INTO "Otps"(id, expired, poll_id, user_id, version)
    VALUES(?, ?, ?, ?, ?)
    RETURNING *
`;
