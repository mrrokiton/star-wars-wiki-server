import fs from 'fs/promises';
import { Express } from 'express';
import { BasicType, PersonJsonType } from '../types/data-types';

export const addPeopleRoutes = (app: Express) => {
	app.get('/people', async (req, res) => {
		const reqQuery = req.query;

		console.log('API GET: /people', reqQuery);

		let content;

		try {
			content = await fs.readFile('./src/data/people-data.json', 'utf-8');
		} catch (error) {
			console.log('Error', error);
			return res.sendStatus(500);
		}

		content = JSON.parse(content) as PersonJsonType;

		if ((reqQuery.sorted as string)?.toLowerCase() === 'true') {
			content.people = content.people.sort((a, b) =>
				a.name.localeCompare(b.name)
			);
		}

		if ((reqQuery.onlyNames as string)?.toLowerCase() === 'true') {
			content.people = content.people.map((elem) => {
				return { id: elem.id, name: elem.name } as BasicType;
			});
		}

		res.type('json');
		res.json(content);
	});

	app.get('/people/:id', async (req, res) => {
		const id = req.params.id;
		console.log(`API GET: /people/${id}`);

		let content;

		try {
			content = await fs.readFile('./src/data/people-data.json', 'utf-8');
		} catch (error) {
			console.log('Error', error);
			return res.sendStatus(500);
		}

		content = JSON.parse(content) as PersonJsonType;

		const person = content.people.find((elem) => elem.id === id);

		if (!person) {
			res.sendStatus(404);
		}

		res.type('json');
		res.send(person);
	});
};
