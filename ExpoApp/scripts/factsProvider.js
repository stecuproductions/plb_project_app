import facts from '../assets/data/facts.json';


export  function getFacts(){
    return facts;    
}

export async function getFactOfTheDay(){
    const randomIndex = Math.floor(Math.random() * facts.length);
    return facts[randomIndex];
}
