const cds = require('@sap/cds');
const { UPDATE } = cds.ql;

module.exports = cds.service.impl(function () {

    const { Books } = this.entities;

    this.on('approveBook', async (req) => {

        const { ID } = req.data;

        await UPDATE(Books)
            .set({ status: 'Approved' })
            .where({ ID });

        return "Book Approved Successfully";

    });

});