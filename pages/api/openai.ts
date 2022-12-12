import { NextApiRequest, NextApiResponse } from 'next'
const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
  apiKey: 'some-key',
});
const openai = new OpenAIApi(configuration);

interface TagObject {
    label: string
    key: number
}

const getLabels = (tags: Array<TagObject>) => {
    let labels = '';
    tags.forEach((tag: TagObject, i: number) => {
        if (i === tags.length - 1) {
            labels += tag.label;
        } else {
            labels += `${tag.label}, `;
        }
    });
    return labels;
}

export default async (req: NextApiRequest, res: NextApiResponse) => {
    let reqData = JSON.parse(req.body);
    console.log('reqData', reqData);
    let tags = getLabels(reqData.tags);

    const prompt = `\n
        Write a job posting, with a job description section, responsibilities section 
        and requirements section, using the following information \n\n
        Company Name: BlazePay \n
        Company Description: 'BlazePay is a fintech company specializing in payments in the web3 space.' \n
        Company Location: '${reqData.location}' \n
        Remote: '${reqData.remotePosition}' \n
        Job Title: '${reqData.jobTitle}' \n
        Skills: ${tags}\n
        Years of Experience: ${reqData.yearsOfExperience}+ \n
        Visa Sponsorship: ${reqData.visa} \n
        Additional Information: '${reqData.description}'
    `;

    // Build the request options for the OpenAI API
    const completion = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: prompt,
        temperature: 0.79,
        frequency_penalty: 0.36,
        presence_penalty: 0.35,
        max_tokens: 900,
      });
  
      if (req.method === "OPTIONS") {
          res.status(204).send('');
          return;
      }
  
      try {
          res.send(completion.data.choices[0].text)
      } catch(error) {
          res.send(error)
      }
}
