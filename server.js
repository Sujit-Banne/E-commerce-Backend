//sk_test_51Mh9txSJ0IlIJKWfL4SO5zowkAt85RosuDnZiYmC26UQSyyFqDR1cUPwkWpTnw6jNAP4MyA1F43zKC3Mwz3vf8qI00bBPNyYgh
// Doom Eternals - price_1MhA8xSJ0IlIJKWf6yRCHFoW
//CyberPunks - price_1MhAAtSJ0IlIJKWfL2rMtB5j
// GTA5 - price_1MhAG9SJ0IlIJKWfsjyntWyI
// RDR2 - price_1MhAGtSJ0IlIJKWfIdMjQneJ
//Call Of Duty - price_1MhAHXSJ0IlIJKWffkt5Os31
//PUBG - price_1MhAI3SJ0IlIJKWfxCDuEujF
//Gaming Chair - price_1MhAKGSJ0IlIJKWffIAwvJWq
//Plant vs Zombies Hoodies - price_1MhAKYSJ0IlIJKWf9yb2mcKx
//Gaming Headphones- price_1MhAKnSJ0IlIJKWfOCiIskvt
//Gaming Keyboard and Mouse - price_1MhAL0SJ0IlIJKWf0a3V77GP
//Call Of Duty Hoodie - price_1MhALFSJ0IlIJKWfLFIltYuf
//PS5 - price_1MhALTSJ0IlIJKWfjX8KqjXd

const express = require('express');
const cors = require('cors');
const stripe = require('stripe')('sk_test_51Mh9txSJ0IlIJKWfL4SO5zowkAt85RosuDnZiYmC26UQSyyFqDR1cUPwkWpTnw6jNAP4MyA1F43zKC3Mwz3vf8qI00bBPNyYgh');

const app = express();
app.use(cors());
app.use(express.static('public'))
app.use(express.json());

app.post('/checkout', async (req, res) => {
    const items = req.body.items;
    let lineItems = []
    items.forEach(item => {
        lineItems.push(
            {
                price: item.id,
                quantity: item.quantity
            }
        )
    })

    const session = await stripe.checkout.sessions.create(
        {
            line_items: lineItems,
            mode: 'payment',
            success_url: 'http://localhost:3000/success',
            cancel_url: 'http://localhost:3000/cancel'
        }
    )

    res.send(JSON.stringify({
        url: session.url
    }))
})


app.listen(4000, () => console.log('listening to port'))