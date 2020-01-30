const Dev = require('../models/Dev');
const parseStringAsArray = require('../utils/parseStringAsArray');

module.exports = {
    // Buscar todos os devs num raio de 10 km
    // Filtrar por tecnologias 
    async index(request, response) {
        const {longitude, latitude, techs} = request.query;
            
        techsArray = parseStringAsArray(techs);
        
        const devs = await Dev.find({
            techs: {
                $in: techsArray
            },
            location: {
                $near: {
                    $geometry:{
                        type: 'Point',
                        coordinates: [longitude, latitude]
                    },
                    $maxDistance: 10000
                }
            }
        });

        return response.json({ devs });
    }
}