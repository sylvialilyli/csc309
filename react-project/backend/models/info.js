const mongoose = require('mongoose');

const InfoSchema = new mongoose.Schema({
    petsName: String,
    gender: String,
    species: String,
    hairColour: String,
    lookingFor: String,
    description: String,
    food: String
});

// A function to find the info record of a matched pet based on given preferences
InfoSchema.statics.findMatch = async function(id) {
	const info = this

	log("Finding matched")

	const petinfo = await info.findById(id)

	if (!petinfo) {
		return Promise.reject()
	} 

	return info.aggregate([
		{ $match: { _id: {$ne: [petinfo._id]}, gender: petinfo.lookingFor, species: petinfo.species} }
		]).then((matched) => {
			if (!matched) {
				return Promise.reject()
			}
			return Promise.resolve(matched)
			})
}


const Info = mongoose.model('Info', InfoSchema);
module.exports = { Info };