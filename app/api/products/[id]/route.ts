import { NextResponse } from "next/server";
import Product from "../../models/other.model";
import path from "path";
import formidable from "formidable";
import { Readable } from "stream";
import fs from 'fs'
import User from "../../models/users.model";

interface Params{
    params:{id:string}
}

export async function GET(req:Request,{params}:Params) {
    const {id} = await params
    try {
        const res = await Product.findById(id)
        const user = await User.findById(res.user)
        const data = res
        data.user = user.name
        return NextResponse.json({message:'got it',res})
        
    } catch (error) {
        console.error(error)
        return NextResponse.json({message:`can't get the product`})
        
    }
}



interface ReadableWithHeaders extends Readable {
  headers: {
    'content-type': string;
    'content-length': string;
  };
  incomig:{
    'g':'gg'
  };

}

async function streamToNodeReadable(stream:ReadableStream<Uint8Array>) {
  const reader = stream.getReader();
  return new Readable({
    async read() {
      const { done, value } = await reader.read();
      if (done) this.push(null);
      else this.push(value);
    },
  });
}


export const config = {
    api: {
      bodyParser: false,
    },
  };



export async function PATCH(req:Request,{params}:Params) {
    const {id} = await params



    const form = formidable({ multiples: true });
    
    const nodeStream:ReadableWithHeaders = await streamToNodeReadable(req.body as ReadableStream<Uint8Array>) as ReadableWithHeaders;
  
    nodeStream.headers = {
      'content-type': req.headers.get('content-type') || '',
      'content-length': req.headers.get('content-length') || '',
    };
    
  
  
    return new Promise((resolve) => {
  
      form.parse(nodeStream, async (err, fields:Record<string,any[]>, files:{image:[{newFilename:string,filepath:string}]}) => {
        if (err){
          console.error(err);
          return resolve(NextResponse.json({ error: 'Error parsing form data' }, { status: 500 }));
        }
      
        
        if(files.image){
        const image = files.image[0] 
  
        const uploadDir = path.join(process.cwd(), 'public/uploads');
        const filePath = path.join(uploadDir, image.newFilename);
        fs.rename(image.filepath, filePath,()=>console.log('img uploaded'));
        const editedData:Record<string,unknown> = {}
  
        for (let index = 0; index < Object.keys(fields).length; index++) {
          const key:string = Object.keys(fields)[index] 
          editedData[key] = fields[key][0]
         }
  
         editedData['image'] = image.newFilename
         const newProduct = await Product.findByIdAndUpdate(id,editedData);
  
         return resolve(NextResponse.json({ message: 'Edited successfully',res:newProduct }));
  
        }else{
            const editedData:Record<string,unknown> = {}
  
            for (let index = 0; index < Object.keys(fields).length; index++) {
              const key:string = Object.keys(fields)[index] 
              editedData[key] = fields[key][0]
             }
             const newProduct = await Product.findByIdAndUpdate(id,editedData);
             
             return resolve(NextResponse.json({ message: 'Edited successfully',res:newProduct }));

        }
  
        
    })
  })
  
  

    // return NextResponse.json({ message: 'Product added' });
  }


export async function DELETE(req:Request,{params}:Params) {
  const {id} = await params
  
  try {
      const product = await Product.findByIdAndDelete(id)
      return NextResponse.json({message:'Product deleted', product})
      
  } catch (error) {
      return NextResponse.json({message:'we got an error do something', error})
      
  }
}