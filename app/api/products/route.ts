/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from 'next/server';
import Product from '../models/other.model';
import { Readable } from 'stream';
import formidable from 'formidable';
import path from 'path';
import fs from 'fs'

export async function GET() {
  const res = await Product.find()
  if(!res){
    return NextResponse.json({ message: 'NO product',data:[{}] });
  }
  return NextResponse.json({ message: 'Product list',data:res });
}

export const config = {
  api: {
    bodyParser: false,
  },
};

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
export async function POST(req:Request) {
  
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
    
      const image = files.image[0] 
      
      if(image){

      const uploadDir = path.join(process.cwd(), 'public/uploads');
      const filePath = path.join(uploadDir, image.newFilename);
      fs.rename(image.filepath, filePath,()=>console.log('img uploaded'));
      const editedData:Record<string,any> = {}

      for (let index = 0; index < Object.keys(fields).length; index++) {
        const key:string = Object.keys(fields)[index] 
        editedData[key] = fields[key][0]
       }

       editedData['image'] = image.newFilename
       const newProduct = new Product(editedData);
       const res = await newProduct.save();

       return resolve(NextResponse.json({ message: 'upload received',res:res }));

      }

      















  })
})







  
  // return NextResponse.json({ message: 'Product added' });
}
