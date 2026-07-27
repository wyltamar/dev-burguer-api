'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    
    await queryInterface.sequelize.query(`

        DELETE FROM categories c1
        USING categories c2
        WHERE c1.id < c2.id 
        AND c1.name = c2.name 
        AND c1.name = 'Hambueguer';
      `
    );
  },

  async down (queryInterface, Sequelize) {
    
      return Promise.resolve()
     
  }
};
