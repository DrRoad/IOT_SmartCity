'use strict';
/**
 * Created by Ben Hu on 2016/3/5.
 */
module.exports = function(app){
    app.get('/api/scan', function (req, res) {
        res.status(200).json([
            {
                name: 'HC-06',
                address: '98-d3-31-fc-1a-48',
                connected: false
            },
            {
                name: 'Bluetooth Mouse M557',
                address: '00-1f-20-ca-d0-9d',
                connected: false
            },
            {
                name: 'Ben\'s iPhone6',
                address: '70-14-a6-21-bb-92',
                connected: false
            }
        ]);
    });
};