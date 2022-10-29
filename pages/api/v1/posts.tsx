import {NextApiHandler} from 'next';
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const Posts: NextApiHandler = async (req, res) => {
    console.log("req.body");
    console.log(req.body);
    console.log(req.method);
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    if(req.method==="POST"){
      console.log('post');
      
    const r = req.body
    const user = await prisma.user.upsert({
      where: {
        address: (r.address).toString(),
      },
      update: {
        logo: ( r.logo_url).toString(),
        featured: ( r.featured).toString(),
      },
      create: {
        address: (r.address).toString(),
        logo: ( r.logo_url).toString(),
        featured: ( r.featured).toString(),
      },
      })
      console.log(user)
  
  res.write(JSON.stringify({"status":"yes"}));
}else if(req.method==="GET"){
  console.log('get');
  
    console.log(req.query);
    const b = Object.keys( req.query)[0]
    // const users = await prisma.user.findMany()
    // const a = users.filter((e)=>console.log(e.name?.slice(3,-3)))
    
    console.log(b);
    const user = await prisma.user.findUnique({
      where: {
        address: b,
      },
    })

      console.log('---')
       console.log(user)
    res.write(JSON.stringify(user));
}else{
  res.write(JSON.stringify({"status":"error"}));
}
res.statusCode = 200;
res.end()
};
export default Posts;