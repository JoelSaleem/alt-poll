export const buildUpdateQuery = (
  tableName: string,
  fields: string[],
  whereParams: string[]
) => {
  // Build update command
  let command = [`UPDATE "${tableName}"`];
  const updateFields = ["SET"];
  fields.forEach((field) => {
    updateFields.push(`${field} = ?,`);
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
