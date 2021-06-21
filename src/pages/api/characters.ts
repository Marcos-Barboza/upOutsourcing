// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
// import dbConnect from '../../utils/dbConnect';
// import Characters from './models/characters';

// export default async function handler(req: Request, res: Response) {
//   const { method } = req;
//   await dbConnect();

//   switch (method) {
//     case 'GET':
//       try {
//         const characters = await Characters.find({ favorite: true });
//         res.status(200).json({ success: true, data: characters });
//       } catch (error) {
//         res.status(400).json({ success: false });
//       }
//       break;
//     case 'POST':
//       try {
//         const checkRegister = await Characters.findOne({ name: req.body.name });
//         if (checkRegister) {
//           res.status(200).json({ success: true, message: 'usuario ja adicionado nos favoritos!', data: null });
//         } else {
//           const characters = await Characters.create(req.body);
//           res.status(200).json({ success: true, data: characters });
//         }
//       } catch (error) {
//         res.status(400).json({ success: false, error });
//       }
//       break;
//     case 'DELETE':
//       try {
//         const characters = await Characters.findOne({ name: req.body.name }, (err, doc) => {
//           doc.favorite = false;
//           doc.save();
//         });
//         res.status(200).json({ success: true, data: characters });
//       } catch (error) {
//         res.status(400).json({ success: false });
//       }
//       break;
//     default:
//       res.status(400).json({ success: false });
//       break;
//   }
// }
