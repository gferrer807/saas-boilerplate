import { NextApiRequest, NextApiResponse } from 'next'
import { v4 as uuidv4 } from 'uuid';

const {
    NEXT_PUBLIC_SUPABASE_URL,
    NEXT_PUBLIC_SUPABASE_ANON_KEY
} = process.env;

// Connect to our database 
const { createClient } = require('@supabase/supabase-js');
const supabase = createClient(NEXT_PUBLIC_SUPABASE_URL, NEXT_PUBLIC_SUPABASE_ANON_KEY);

export default async (req: NextApiRequest, res: NextApiResponse) => {
    let reqData = JSON.parse(req.body);
    const { 
		jobTitle,
		jobDescription,
		user_id
	} = reqData;

	const { data, error } = await supabase
	.from('jobPostings')
	.insert([
		{
			id: uuidv4(),
			jobTitle: jobTitle, 
			jobDescription: jobDescription,
			user_id: user_id
		},
	]);

	if (req.method === "OPTIONS") {
		res.status(204).send('');
		return;
	}

	if (error) {
		res.send(error)
	}

	res.send("Success")
}
