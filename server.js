const express = require('express');
const cors = require('cors');
const path = require ('path')

if (process.env.NODE_ENV !== 'production') require('dotenv').config();

const stripe = require('stripe') (process.env.STRIPE_SECRET_KEY);

const app = express();
const port =process.env.PORT || 5000;

app.use(cors());

app.use(express.json())
app.use(express.urlencoded({extended : true}));

if (process.env.NODE_ENV !== 'production'){
    app.use(express.static(path.join(__dirname, 'client/build')));

    app.get('/*splat', function(req, res){
        res.sendFile(path.join(__dirname, 'client/build', 'index.html'))
    })
}

app.listen(port, error =>{
  if(error) throw error;
  console.log(`server running on port  ${port}`)
});


app.post('/payment',async (req, res) =>{
    const body ={
        source : req.body.token.id,
        amount : req.body.amount,
        currency : 'usd'
    };

    try {
        const stripeRes = await stripe.charges.create(body);
        res.status(200).send({success: stripeRes});
    } catch (stripeErr) {
        res.status(500).send({error: stripeErr});
    }
});