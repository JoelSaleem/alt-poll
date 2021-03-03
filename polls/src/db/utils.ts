export const buildUpdateQuery = (
  tableName: string,
  fields: string[],
  body: { [key: string]: any },
  whereParams: string[]
) => {
  // Build update command
  let command = [`UPDATE "${tableName}"`];
  if (!fields.some((field) => field in body)) {
    throw new Error("You must provide some fields to update");
  }
  const updateFields = ["SET"];
  fields.forEach((field) => {
    if (field in body) {
      updateFields.push(`${field} = ?,`);
    }
  });

  // Remove trailing comma
  const finalUpdatePhrase = updateFields[updateFields.length - 1];
  updateFields[updateFields.length - 1] = finalUpdatePhrase.substring(
    0,
    finalUpdatePhrase.length - 1
  );

  command.push(updateFields.join(" "));

  const whereClause: string[] = [];
  whereParams.forEach((param) => {
    whereClause.push(`${param} = ?`);
  });

  const whereStr = "WHERE " + whereClause.join(" AND ");
  command.push(whereStr);

  command.push("RETURNING *");

  return command.join("\n");
};
