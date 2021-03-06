'use strict';

async function getConstraintName(queryInterface, tableName, column) {
  let arr = await queryInterface.getForeignKeyReferencesForTable(tableName)
  return arr.find(val => val.columnName == column).constraintName
}

module.exports = {
  up: async (queryInterface, Sequelize) => {
    try 
    {
      let constraint = await getConstraintName(queryInterface,'lost_chunks','variant_id')
      await queryInterface.removeConstraint('lost_chunks',constraint)
      await queryInterface.addConstraint('lost_chunks',['variant_id'],{
        type: 'foreign key',
        name: constraint,
        references: { 
          table: 'variants',
          field: 'id'
        },
        onDelete: 'cascade',
        onUpdate: 'cascade'
      })
    }
    catch(err)
    {
      console.log(err)
      throw err
    }
  },

  down: async (queryInterface, Sequelize) => {
    let constraint = await getConstraintName(queryInterface,'lost_chunks','variant_id')
    await queryInterface.removeConstraint('lost_chunks',constraint)
    await queryInterface.addConstraint('lost_chunks',['variant_id'],{
      type: 'foreign key',
      name: constraint,
      references: { 
        table: 'variants',
        field: 'id'
      }
    })
  }
};
