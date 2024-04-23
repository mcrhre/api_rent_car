import { Router } from 'express'
import AuthenticateToken from './app/middleware/AuthenticateToken.js';
import UserController from './app/controllers/UserController.js';
import CarController from './app/controllers/CarController.js';
import BookingController from './app/controllers/BookingController.js';
import LogonController from './app/controllers/LogonController.js';

const router = Router();

router.get('/', (req, res) => {
	let routes = {
		"routes": {
			"/list_cars": {"method":"GET"},
			"/get_booking/{id}": {"method":"GET"},
			"/add_booking": {"method":"POST"},
			"/del_booking/{id}": {"method":"DELETE"},
			"/edit_booking/{id}": {"method":"PUT"},
		}
	}

	res.status(200).json(routes);
});

router.post('/login', LogonController.login);
router.delete('/logoff/:id', AuthenticateToken.verify, LogonController.logoff);

router.get('/list_users', AuthenticateToken.verify, UserController.index);
router.get('/get_user/:id', AuthenticateToken.verify, UserController.show);
router.post('/add_user', AuthenticateToken.verify, UserController.store);
router.put('/edit_user/:id', AuthenticateToken.verify, UserController.update);
router.delete('/del_user/:id', AuthenticateToken.verify, UserController.delete);

router.get('/list_cars', AuthenticateToken.verify, CarController.index);
router.get('/get_car/:id', AuthenticateToken.verify, CarController.show);
router.post('/add_car', AuthenticateToken.verify, CarController.store);
router.put('/edit_car/:id', AuthenticateToken.verify, CarController.update);
router.delete('/del_car/:id', AuthenticateToken.verify, CarController.delete);

router.get('/list_bookings', AuthenticateToken.verify, BookingController.index);
router.get('/get_booking/:id', AuthenticateToken.verify, BookingController.show);
router.post('/add_booking', AuthenticateToken.verify, BookingController.store);
router.put('/edit_booking/:id', AuthenticateToken.verify, BookingController.update);
router.delete('/del_booking/:id', AuthenticateToken.verify, BookingController.delete);

export default router
