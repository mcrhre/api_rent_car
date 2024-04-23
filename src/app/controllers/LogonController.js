import LogonRepository from '../repositories/LogonRepository.js';
import AuthenticateToken from '../middleware/AuthenticateToken.js';
import jwt from 'jsonwebtoken';

class LogonController {

	async login(req, res){

		const { email, password } = req.body;
		
	  	try {
			const result = await LogonRepository.login(email, password);
			
			if (!result) {
				res.status(404).send('User not found');
			}else{
				
				const id = result._id; 
				const token = jwt.sign({ id }, AuthenticateToken.SECRET, {
				  expiresIn: 300 // expires in 5min
				});

				delete result.password
				result.session = token;

				await LogonRepository.saveToken(id, token);
				
				res.status(200).send(result);
			}		  			
		} catch (error) {
		    console.error("Error login:", error);
		    res.status(401).send("Error login");
		}
	}

	async logoff(req, res){
		const index = req.params.id;

	  	try {
			const result = await LogonRepository.logoff(index);
		    res.status(200).send('You Logoff!');
		} catch (error) {
		    console.error("Error logoff:", error);
		    res.status(500).send("Error logoff");
		}
	}
}

export default new LogonController()
