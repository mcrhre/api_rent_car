import BookingRepository from '../repositories/BookingRepository.js';

class BookingController {

	async index(req, res) {
		try {
			const result = await BookingRepository.findAll();
			res.status(200).json(result);
		} catch (error) {
	    	console.error("Error fetching collection data:", error);
	    	res.status(500).send("Error fetching collection data");
		}
	}

	async show(req, res){
	  	const index = req.params.id;

		try {
			const result = await BookingRepository.findById(index);
			res.status(200).json(result);
		} catch (error) {
	    	console.error("Error fetching collection data:", error);
	    	res.status(500).send("Error fetching collection data");
		}
	}

	async store(req, res){
		const json = req.body;

	  	try {
			const result = await BookingRepository.create(json);
			res.status(201).send("Your reservation has been made!");
		} catch (error) {
		    console.error("Error inserting document into collection:", error);
		    res.status(500).send("Error inserting document into collection");
		}
	}

	async update(req, res){
		const index = req.params.id;
		const json = req.body;
	  	
	  	try {
		    const result = await BookingRepository.update(index, json);
		    res.status(200).send('Your reservation has been edit!');
		} catch (error) {
		    console.error("Error updating document in collection:", error);
		    res.status(500).send("Error updating document in collection");
		}
	}

	async delete(req, res){
		const index = req.params.id;

	  	try {
			const result = await BookingRepository.delete(index);
		    res.status(200).send('Your reservation has been delete!');
		} catch (error) {
		    console.error("Error deleting document in collectiono:", error);
		    res.status(500).send("Error deleting document in collection");
		}
	}
}

export default new BookingController()
