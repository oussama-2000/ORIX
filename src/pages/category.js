import { useParams } from "react-router-dom";
import categoriesData from "../categories.json";
import { Card, CardMedia, CardContent, Typography, Box } from "@mui/material";
import { Link } from "react-router-dom";

export default function Category() {
  const { gender } = useParams(); // men, women, girls, boys
  const data = categoriesData[gender];

  if (!data) return <h2>Category not found</h2>;

  return (
    <Box sx={{ width: "95vw", mt: "20vh", ml: "2.5vw" }}>
      <Typography
        variant="h4"
        sx={{
          mb: "4vh",
          fontSize: { xs: "25px", sm: "35px", md: "45px" },
          textAlign: { xs: "center", sm: "left" },
        }}
        gutterBottom
      >
        {data.title}’s Clothes
      </Typography>
      <Box
        sx={{
          width: "100%",
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-around",
          mb: "10vh",
        }}
      >
        {data.categories.map((cat) => (
          <Box key={cat.id}>
            <Link
              to={`/${gender}/${cat.id}`}
              style={{ textDecoration: "none" }}
            >
              <Card sx={{ border: "none", borderRadius: "0", boxShadow: "0" }}>
                <CardMedia
                  component="img"
                  height="300"
                  image={cat.image}
                  alt={cat.name}
                />
                <CardContent>
                  <Typography
                    variant="h7"
                    align="center"
                    sx={{ color: "black", textDecoration: "underline" }}
                  >
                    {cat.name}
                  </Typography>
                </CardContent>
              </Card>
            </Link>
          </Box>
        ))}
      </Box>
      {data.title === "Men" ? (
        <Box>
          <Typography
            variant="h5"
            sx={{
              fontSize: { xs: "20px", sm: "26px" },
              fontWeight: "400",
              mb: 2,
            }}
          >
            How to Style and Put Together Men’s Outfits
          </Typography>
          <Typography
            sx={{ lineHeight: "1.8", fontSize: { xs: "14px", sm: "16px" } }}
          >
            Looking for outfit ideas? Orix has a collection of laid back and
            buttoned-up pieces to put together the best men's outfits for
            anything you’re doing. So if you’re WFH or IRL, Orix’s men’s
            clothing balances comfort with cool for your 9 to 5 and beyond. Pair
            our Slim Jeans, Slim Corduroys, or crisp Modern Khakis with the
            All-Day Poplin Shirt, a Classic Oxford Shirt, or a Cable-Knit
            Crewneck Sweater. Bring work-life balance into your weekend
            wardrobe. Go for an off-duty look in a slouchy, comfy pair of ’90s
            Loose Jeans and a Flannel Shirt, a cozy crewneck sweater. Take the
            chill out in our Arctic Fleece Mockneck Pullover or a Vintage Soft
            Hoodie with easy Carpenter Jeans or corduroys – take your pick
            between Slim Corduroys or ’90s Loose Corduroys. When your outfit
            needs layers, try a comfy Waffle Henley T-Shirt, or a Heavyweight
            Pocket T-Shirt under a Corduroy Overshirt, Denim Utility Overshirt,
            or Plaid Overshirt. Finish it off and keep the warmth in with a
            Recycled Puffer Vest, Recycled Parka, or a Wool Car Coat. Getting
            dressed to go out? Get ready for it in classic khakis or cool cords.
            Top your pair off with a buttoned-up shirt or a smart sweater — even
            better if they’re together. Between crewneck and v-neck, cable-knit
            and Fair Isle, Merino and waffle, we’ve got sweater weather — and
            you — covered. Whatever you’ve got going on, Orix has you covered
            for that timeless yet modern style for men’s outfits that always
            work.
          </Typography>
        </Box>
      ) : null}
      {data.title === "Women" ? (
        <Box>
          <Typography
            variant="h5"
            sx={{
              fontSize: { xs: "20px", sm: "26px" },
              fontWeight: "400",
              mb: 2,
            }}
          >
            Women’s Clothing For All Lifestyles{" "}
          </Typography>
          <Typography
            sx={{ lineHeight: "1.8", fontSize: { xs: "14px", sm: "16px" } }}
          >
            New seasons are the perfect time to refresh your closet with
            essentials for everything you do — work, play, celebrate, rest, and
            everything in between. And each season, Orix introduces women’s
            clothing to curate a wardrobe of on-trend, versatile modern
            classics. Spend less time thinking about what to wear to work, how
            to dress for a wedding, and how to style casual outfits for the
            weekend by getting dressed in Orix.{" "}
          </Typography>
          <Typography
            sx={{ lineHeight: "1.8", fontSize: { xs: "14px", sm: "16px" } }}
          >
            Looking for women’s clothes for work? Orix has office outfits that
            can take you from work to weekend. A blazer with a pair of jeans is
            forever — but take it up a notch with our best-selling faux-leather
            in your favorite denim fits like our ’70s Flare Jeans, Cheeky
            Straight Jeans, and Vintage Slim Jeans. Want a classic preppy look?
            Try cool corduroy jeans or comfortable khakis with a button-up shirt
            — the Big Shirt and the Perfect Shirt are favorites that come in
            enough colors, patterns, and fabrics to wear every day. Finish it
            off with a cozy layer, like plush sweaters, cardigans, and dusters.
            CashSoft sweaters have been a winter must —plush like cashmere and
            buttery soft. Looking to dress it up? From shirt dresses and sweater
            dresses to satin dresses and wrap dresses, our women’s dresses for
            work are perfect for any office environment.{" "}
          </Typography>
        </Box>
      ) : null}
      {data.title === "Girls" ? (
        <Box>
          <Typography
            variant="h5"
            sx={{
              fontSize: { xs: "20px", sm: "26px" },
              fontWeight: "400",
              mb: 2,
            }}
          >
            Shop OrixKids Girls Clothes{" "}
          </Typography>
          <Typography
            sx={{ lineHeight: "1.8", fontSize: { xs: "14px", sm: "16px" } }}
          >
            Find all her favorite styles in one place. OrixKids offers a wide
            selection of girls’ clothes designed for easy mixing and matching,
            so she can create outfits that fit any occasion. From everyday
            essentials to standout pieces, there’s something for every part of
            her wardrobe.{" "}
          </Typography>
          <Typography
            sx={{ lineHeight: "1.8", fontSize: { xs: "14px", sm: "16px" } }}
          >
            Everyday Essentials <br />
            Building a wardrobe starts with the basics. Soft t-shirts,
            comfortable leggings, and classic jeans are must-haves for her daily
            routine. Whether she prefers graphic tees with bold prints or
            simple, solid colors, OrixKids has a variety of options that pair
            effortlessly with leggings or denim. Joggers and pull-on pants
            provide even more ways to mix and match, making it easy to put
            together outfits for school, playdates, and family outings.
          </Typography>
          <Typography
            sx={{ lineHeight: "1.8", fontSize: { xs: "14px", sm: "16px" } }}
          >
            Seasonal Favorites <br />
            Warmer weather calls for easy styles. Lightweight shorts and skirts,
            paired with fun t-shirts or tanks, create the perfect combination
            for outdoor adventures. Girls denim shorts offer endless styling
            possibilities, working just as well with a printed tee as they do
            with a flowy blouse. When temperatures cool down, layering becomes
            key. Soft outerwear pieces like hoodies, zip-up jackets, and cozy
            sweaters provide warmth without sacrificing comfort.
          </Typography>
          <Typography
            sx={{ lineHeight: "1.8", fontSize: { xs: "14px", sm: "16px" } }}
          >
            Dresses for Every Occasion <br />
            Dresses bring a versatile and effortless touch to her wardrobe.
            Whether she loves twirling in a tiered dress or prefers the
            structured feel of a shirt dress, OrixKids offers styles for every
            preference. A-line and fit-and-flare silhouettes add a playful
            element, while rompers and jumpsuits offer a one-and-done styling
            solution. These easy pieces work well for everything from weekend
            brunches to family gatherings.{" "}
          </Typography>
          <Typography
            sx={{ lineHeight: "1.8", fontSize: { xs: "14px", sm: "16px" } }}
          >
            Pants and Leggings That Move with Her <br />
            Comfort and versatility go hand in hand when it comes to pants and
            leggings. Soft, stretchy leggings make an easy go-to choice for
            active days, while classic denim adds a timeless touch to her look.
            Joggers and pull-on pants provide a relaxed fit for school or
            weekend wear. No matter what’s on the agenda, OrixKids has pants
            that move with her.
          </Typography>
          <Typography
            sx={{ lineHeight: "1.8", fontSize: { xs: "14px", sm: "16px" } }}
          >
            From everyday basics to standout pieces, OrixKids girl’s clothes
            makes it easy to build a wardrobe that fits her life. Whether you’re
            shopping for seasonal staples, layering pieces, or special-occasion
            outfits for girls, you’ll find a wide range of options to suit her
            style.
          </Typography>
        </Box>
      ) : null}
      {data.title === "Boys" ? (
        <Box>
          <Typography
            variant="h5"
            sx={{
              fontSize: { xs: "20px", sm: "26px" },
              fontWeight: "400",
              mb: 2,
            }}
          >
            Boys Clothes for Every Occasion{" "}
          </Typography>
          <Typography
            sx={{ lineHeight: "1.8", fontSize: { xs: "14px", sm: "16px" } }}
          >
            Orix Kids offers a wide selection of boys clothes designed for
            comfort, durability, and everyday wear. Whether you’re shopping for
            school, weekend outings, or family gatherings, you’ll find outfits
            for boys that match every need. From soft t-shirts and comfortable
            hoodies to polished polo shirts and versatile jackets, Orix Kids has
            everything to keep up with his daily adventures.{" "}
          </Typography>
          <Typography
            sx={{ lineHeight: "1.8", fontSize: { xs: "14px", sm: "16px" } }}
          >
            Each season brings new styles and updated essentials, making it easy
            to refresh his wardrobe with the latest boys clothing. Lightweight
            layers, cozy outerwear, and comfortable pants create a mix-and-match
            wardrobe that works year-round. Whether he prefers relaxed fits for
            playtime or a more structured look for school, Orix Kids offers a
            variety of options designed for both style and function.
          </Typography>
          <Typography
            sx={{ lineHeight: "1.8", fontSize: { xs: "14px", sm: "16px" } }}
          >
            Everyday Comfort and Style <br />
            T-shirts and polo shirts are must-haves for any wardrobe. Soft
            cotton tees make great layering pieces and come in a variety of
            colors and prints to match his personality. Boys polo shirts offer a
            more polished option that’s ideal for school, family gatherings, or
            casual outings. Pair them with jeans, chinos, or joggers for a look
            that’s both comfortable and easy to wear.{" "}
          </Typography>
          <Typography
            sx={{ lineHeight: "1.8", fontSize: { xs: "14px", sm: "16px" } }}
          >
            For cooler days, boys hoodies and outerwear provide the perfect
            extra layer. Zip-up and pullover hoodies offer warmth without
            feeling bulky, making them ideal for school, play, or lounging at
            home. Boys jackets range from lightweight windbreakers to insulated
            puffer styles, ensuring he stays comfortable no matter the weather.
          </Typography>
          <Typography
            sx={{ lineHeight: "1.8", fontSize: { xs: "14px", sm: "16px" } }}
          >
            Versatile Outfits for Boys <br />
            Dressing for different occasions is simple with Orix Kids'
            thoughtfully designed boys clothes. School days call for comfortable
            yet put-together outfits, such as boys polo shirts paired with slim
            or straight-fit jeans. For more active days, breathable joggers and
            moisture-wicking tops keep up with his energy.{" "}
          </Typography>
          <Typography
            sx={{ lineHeight: "1.8", fontSize: { xs: "14px", sm: "16px" } }}
          >
            On weekends, relaxed outfits for boys make it easy to transition
            from one activity to the next. Soft fleece boys hoodies pair
            effortlessly with joggers or jeans, while boys jackets provide an
            extra layer when heading outside. The right mix of casual and
            practical styles ensures he’s ready for any adventure.
          </Typography>
          <Typography
            sx={{ lineHeight: "1.8", fontSize: { xs: "14px", sm: "16px" } }}
          >
            Durable Boys Clothing for Play and Beyond <br />
            Boys clothes from Orix Kids are made to handle the energy of active
            days. Reinforced stitching, soft yet sturdy fabrics, and a focus on
            movement-friendly fits mean his favorite pieces stay in rotation
            longer. Whether he’s running, climbing, or just relaxing, every item
            is designed with his comfort in mind.{" "}
          </Typography>
          <Typography
            sx={{ lineHeight: "1.8", fontSize: { xs: "14px", sm: "16px" } }}
          >
            With a variety of styles and sizes, including slim and husky fits,
            finding the right boys clothing is simple. From classic polo shirts
            to must-have jackets, Orix Kids makes shopping easy with options
            that fit every part of his day.
          </Typography>
        </Box>
      ) : null}
    </Box>
  );
}
