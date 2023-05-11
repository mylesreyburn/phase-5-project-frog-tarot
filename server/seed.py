# Standard library imports
from random import randint, choice as rc

# Remote library imports
from faker import Faker

# Local imports
from app import app
from models import db, User, Comment, Post, Tarot

# TAROT INFO
tarot_names = [
    "0: THE FOOL",
    "I: THE MAGICIAN",
    "II: THE HIGH PRIESTESS",
    "III: THE EMPRESS",
    "IV: THE EMPEROR",
    "V: THE HIEROPHANT",
    "VI: THE LOVERS",
    "VII: THE CHARIOT",
    "VIII: JUSTICE",
    "IX: THE HERMIT",
    "X: THE WHEEL OF FORTUNE",
    "XI: STRENGTH",
    "XII: THE HANGED MAN",
    "XIII: DEATH",
    "XIV: TEMPERANCE",
    "XV: THE DEVIL",
    "XVI: THE TOWER",
    "XVII: THE STARS",
    "XVIII: THE MOON",
    "XIX: THE SUN",
    "XX: JUDGEMENT",
    "XXI: THE WORLD",
    "XXII: omg hatsune miku (o///o)"
]



tarot_descriptions = [
    "You are The Fool! Dummy. Idiot. Stupid. These are common words thrown at you, but you don't care about what their sources have to say. You've got two dang snails on your head. What do they know? Nothing. If anything, they're the real fools. Dummies. Idiots. Stupids.",
    "You are The Magician! You're no stranger to incredible magical power, and all the common folk of the land know your name. Though you may show them mercy for now, they should live in fear from the knowledge that they would be reduced to ash if you so willed it. If you see Strength, I beg you, do not fight them. Such a clash could very well destroy the world.",
    "You are The High Priestess! How many flock to you and faun over your every word? Like, thirty kajillion? That's a lot! Don't let your popularity go to your head, though: You may be high, but you're still a priestess. You gotta like do things, dummy. Go be responsible.",
    "You are The Empress! How does this separate you from The Emperor? I don't really know, to be honest. They're pretty similar. You've got some power, you've got some influence, you've got some money. But do you have happiness? Try to smile more, and you'll be perfect.",
    "You are The Emperor! How does this separate you from The Empress? I don't really know, to be honest. They're pretty similar. You've got a cool crown, you've got wealth, you've got friends. But do you have power? Stop being so kind. Rule ruthlessly. Subjugate them.",
    "You are The Hierophant! That's like, crazy! You're a hierophant?? Bro, that's like... I know what that is, for sure, yeah. You do too, right? It's like a religious thing, I think. Kinda like the High Priestess? Google says that the Heirophant is also known as the Pope in other versions of the Major Arcana, so I guess you're the Pope. Invest in a plexiglass cube and a pickup truck for public appearances.",
    "You are The Lovers! Love is your language, and you find joy in the smallest things. Many describe you as the highlight of any social gathering, and they would absolutely be correct. Despite your social leaning, you have no trouble with solitude. After all, you're never truly alone. Such is the boon of being two people trapped in a single body.",
    "You are The Chariot! You're fast. Like, SO fast. You can outrun most cars on foot. You joined your school's track and field team, but got kicked out for cheating after you completed a 100m dash in 3.2 seconds. Scientists have studied you for thousands of hours and they still have no idea why you're so fast. But no matter how fast you run, you can't outrun the demons inside.",
    "You are Justice! You live for your namesake. You've pursued a career in law solely so you can learn more about the subject of justice. A few years ago, you paid $2000 for a custom body pillow featuring that one depiction of Justice where she's a blindfolded lady holding a scale. Best $2000 you ever spent. If you had a nickel for every citizen's arrest you've orchestrated, you'd buy another.",
    "You are The Hermit! You would like to be left alone, please. No solicitors. You'll open the door for packages and food, and that's it. You haven't answered a phone call in 14 years. One time, you slept for 19 hours straight, and you think about that at least twice a day.",
    "You are The Wheel of Fortune! You are the coolest person around. If you don a leather jacket and sunglasses, odds are good that everyone within 30 feet of you will immediately die from the sheer coolness emenating from your body. So, uh, please don't do that. You're cool enough as is.",
    "You are Strength! Indomitable, powerful, utterly massive. In your element. You cannot be shaken by any mortal's actions. Mountains crumble between your fists and seas part around your legs. If you see The Magician, I beg you, do not fight them. Such a clash could very well destroy the world.",
    "You are The Hanged Man! Well, not literally. As The Hanged Man, you are a completely normal person. However, should you tell anyone that you are The Hanged Man, they will always make the same joke: \"Oh wow! I didn't know you'd been hanged before. How are you still alive?\" Being The Hanged Man is a curse. Go hang out with The Hermit, if you can.",
    "You are Death! Don't let the title fool you; being Death isn't nearly as dire as it sounds. It is your job to bring about the end of things. Not all of reality, nor of lives. You simply bring about the end of parts of peoples' lives. Relationships, depression, peace; you enact the end of all sections of the lives of those around you. Maybe you could try starting something sometime, huh? Always ending things has got to be a drag.",
    "You are Temperance! Wow, you're an important one! Being able to convert HP to coins is insane. Learning to properly utilize you is a mandatory step for any aspiring Isaac player, since you're just about the best store of value one could hope to encounter in a run. You like to hang out in arcades and hand out prizes, though you can be a bit stingy when people need you most. Learn to share, bro.",
    "You are The Devil! ...Really? \"The Devil\"? Come on. You're not that edgy. You're sweet and nice and kind. You baby. You dumb baby.",
    "You are The Tower! You are very tall. Very tall. Nine feet on a good day, ten on a great one. Basketball is trivial for you. There is no shelf you cannot reach. You cannot walk through any building except for a warehouse. Firefighters have had to rescue cats from your shoulders more than once. The weather is actually quite nice up there, though!",
    "You are The Stars! Now, let's keep it real. You're the best. Don't tell the others, don't make a big deal about it, but do know that you're just better than everyone else. Name something. Anything. Flossing? You're the best. Running? Move over Chariot. DDR? Oh, buddy, don't even get me started. You're not quite a god among men, but you're definitely not the same as the meek and pathetic ones around you. Let it go to your head. You deserve it.",
    "You are The Moon! Ahh, what a wonderful thing to be. Many would assume being diametrically opposed to The Sun to be a bad thing, but that's not the case. You find companionship within The Stars, and they're like, the best ever. And yet, even despite their brilliance, who shines brightest in the night sky? I'll give you a hint: It's you. Even if you're surrounded by those who are better than you, remember that you still have a place, and people will still look as long as you shine the brightest you can. By the way, say hi to The Sun for me. Y'all make the cutest couple :)",
    "You are The Sun! Oh, The Sun! You shine brighter than all, turning the blackest void of night to the stunning blue of day with your mere presence. All flourishes because of you. Without you, there would be no World, there would be no Moon, there would be no Tarot. You are the source of the Frogs. And yet, in the sky, you stand alone. Where are The Stars? I'll tell you - They're hiding. You're so brilliant, you completely drown them out. Amazing. That can get a little lonely, though. At least you get the occasional visit from The Moon. Say hi to them for me, by the way. Y'all make the cutest couple :)",
    "You are Judgement! You like to watch. Silently, usually. You don't have much to say. But you do have a lot to think. Many thoughts about all around you, all you see, and all you hear. Your thoughts echo in your mind, reflecting off of one another without any dilution from outside input. They become twisted and deformed, barbed with hate for those around you who you merely choose to observe rather than to understand. Years go by, and these thoughts condense into words. Your tongue too weak to utter them aloud, you turn to the internet, releasing the crystalized essence of your mind upon the helpless denizens of the internet behind the shield of anonymity. \n\"u r suck\"",
    "You are The World! For all those near to you, you are everything. Without you, they would have nothing. You organize events, make friends, and offer any kind of support you can to those in need. You are a true blessing to your community. If The Magician and Strength ever fight, you will instantly die.",
    "You are Hatsune Miku! Congratulations on being a world famous virtual pop star! I'm actually a huge fan! Can I get your autograph? No? Oh. Well, that's ok. Yeah. Thanks for coming by."
]

print(len(tarot_descriptions))
    
tarot_fortunes = [
    "You are forbidden from ordering your usual when you get lunch today. They will know.",
    "Avoid deep puddles and shallow people",
    "Go outside and see many things. Or don't. I'm not your mom.",
    "Man, you ever notice how like, the uhh, the like, when you're like, uhh, you know?",
    "Sleep in your bathtub. Bathe in your bed.",
    "I don't think Scooby Doo could really talk. I think it was all in Shaggy's head.",
    "No you hang up first.",
    "Drink more water.",
    "i'll have uhhhh one large pepperoni, with the garlic crust and a side of breadsticks with two marinaras and a two liter of coke and uhhhh are you guys still running the two for one special?",
    "Don't vote in the next election. Trust me.",
    "VROOM vrrroooooom vrooooooom vrrrroooooooooom SKREEEEEEET KTCHKTCHKTCH",
    "They will be going scissors first next time, make sure to open with rock",
    "Please do not contact this number again.",
    "Go do your dishes. Clean out that sink. Don't play dumb, I can see them from here.",
    "If you're planning on going to Florida any time soon, please hurry, but make sure not to bring anything made of silver.",
    "When you next cross the street, don't look either way. It'll be cool.",
    "Is this thing on?",
    "Wall yourself into your basement.",
    "Frog Tarot does not under any circumstances spy on users and listen in on their conversations. Not because it would be wrong, but because it would be a lot more coding." ,
    "Have you ever had a dream that you, um, you had, your, you- you could, you'll do, you- you wants, you, you could do so, you- you'll do, you could- you, you want, you want them to do you so much you could do anything?",
    "This space for sale!",
    "The winds of change are blowing. Please close the window. It's going to bring the leaves in, and I just vacuumed.",
    "You can be saved. But will you?"
]

tarot_images = [
    "https://i.imgur.com/Mm8ncm1.png",
    "https://i.imgur.com/6z0nCoR.png",
    "https://i.imgur.com/O4EgP8V.png",
    "https://i.imgur.com/fs9fu2b.png",
    "https://i.imgur.com/uhFnj9R.png",
    "https://i.imgur.com/9nKy2ag.png",
    "https://i.imgur.com/ABGZ1PM.png",
    "https://i.imgur.com/CQHwFTH.png",
    "https://i.imgur.com/AZ3qH3Z.png",
    "https://i.imgur.com/f8GxkKY.png",
    "https://i.imgur.com/ZCt65xn.png",
    "https://i.imgur.com/N7W5DVM.png",
    "https://i.imgur.com/rZ2hnOU.png",
    "https://i.imgur.com/TUrgk6g.png",
    "https://i.imgur.com/ACrCWeZ.png",
    "https://i.imgur.com/LKoGhfm.png",
    "https://i.imgur.com/gkPaWXz.png",
    "https://i.imgur.com/rkUX53E.png",
    "https://i.imgur.com/ArIbt22.png",
    "https://i.imgur.com/tY4SLXT.png",
    "https://i.imgur.com/OxYoz1T.png",
    "https://i.imgur.com/JvOwwiF.png",
    "https://i.imgur.com/iByCkjf.png"
]


tarot_dicts = [
    {
        "name" : tarot_names[0],
        "description" : tarot_descriptions[0],
        "fortune" : tarot_fortunes[0],
        "image_url" : tarot_images[0]
    },
    {
        "name" : tarot_names[1],
        "description" : tarot_descriptions[1],
        "fortune" : tarot_fortunes[1],
        "image_url" : tarot_images[1]
    },
    {
        "name" : tarot_names[2],
        "description" : tarot_descriptions[2],
        "fortune" : tarot_fortunes[2],
        "image_url" : tarot_images[2]
    },
    {
        "name" : tarot_names[3],
        "description" : tarot_descriptions[3],
        "fortune" : tarot_fortunes[3],
        "image_url" : tarot_images[3]
    },
    {
        "name" : tarot_names[4],
        "description" : tarot_descriptions[4],
        "fortune" : tarot_fortunes[4],
        "image_url" : tarot_images[4]
    },
    {
        "name" : tarot_names[5],
        "description" : tarot_descriptions[5],
        "fortune" : tarot_fortunes[5],
        "image_url" : tarot_images[5]
    },
    {
        "name" : tarot_names[6],
        "description" : tarot_descriptions[6],
        "fortune" : tarot_fortunes[6],
        "image_url" : tarot_images[6]
    },
    {
        "name" : tarot_names[7],
        "description" : tarot_descriptions[7],
        "fortune" : tarot_fortunes[7],
        "image_url" : tarot_images[7]
    },
    {
        "name" : tarot_names[8],
        "description" : tarot_descriptions[8],
        "fortune" : tarot_fortunes[8],
        "image_url" : tarot_images[8]
    },
    {
        "name" : tarot_names[9],
        "description" : tarot_descriptions[9],
        "fortune" : tarot_fortunes[9],
        "image_url" : tarot_images[9]
    },
    {
        "name" : tarot_names[10],
        "description" : tarot_descriptions[10],
        "fortune" : tarot_fortunes[10],
        "image_url" : tarot_images[10]
    },
    {
        "name" : tarot_names[11],
        "description" : tarot_descriptions[11],
        "fortune" : tarot_fortunes[11],
        "image_url" : tarot_images[11]
    },
    {
        "name" : tarot_names[12],
        "description" : tarot_descriptions[12],
        "fortune" : tarot_fortunes[12],
        "image_url" : tarot_images[12]
    },
    {
        "name" : tarot_names[13],
        "description" : tarot_descriptions[13],
        "fortune" : tarot_fortunes[13],
        "image_url" : tarot_images[13]
    },
    {
        "name" : tarot_names[14],
        "description" : tarot_descriptions[14],
        "fortune" : tarot_fortunes[14],
        "image_url" : tarot_images[14]
    },
    {
        "name" : tarot_names[15],
        "description" : tarot_descriptions[15],
        "fortune" : tarot_fortunes[15],
        "image_url" : tarot_images[15]
    },
    {
        "name" : tarot_names[16],
        "description" : tarot_descriptions[16],
        "fortune" : tarot_fortunes[16],
        "image_url" : tarot_images[16]
    },
    {
        "name" : tarot_names[17],
        "description" : tarot_descriptions[17],
        "fortune" : tarot_fortunes[17],
        "image_url" : tarot_images[17]
    },
    {
        "name" : tarot_names[18],
        "description" : tarot_descriptions[18],
        "fortune" : tarot_fortunes[18],
        "image_url" : tarot_images[18]
    },
    {
        "name" : tarot_names[19],
        "description" : tarot_descriptions[19],
        "fortune" : tarot_fortunes[19],
        "image_url" : tarot_images[19]
    },
    {
        "name" : tarot_names[20],
        "description" : tarot_descriptions[20],
        "fortune" : tarot_fortunes[20],
        "image_url" : tarot_images[20]
    },
    {
        "name" : tarot_names[21],
        "description" : tarot_descriptions[21],
        "fortune" : tarot_fortunes[21],
        "image_url" : tarot_images[21]
    },
    {
        "name" : tarot_names[22],
        "description" : tarot_descriptions[22],
        "fortune" : tarot_fortunes[22],
        "image_url" : tarot_images[22]
    },
]

if __name__ == "__main__":

    fake = Faker()
    with app.app_context():

        print("Seeding...")

        User.query.delete()
        Comment.query.delete()
        Post.query.delete()
        Tarot.query.delete()

        users = []
        for i in range(10):
            username = fake.name()
            email = fake.email()
            bio = fake.paragraph(nb_sentences=10)
            password = "test"

            new_user = User(username=username, email=email, bio=bio, password_hash=password)
            users.append(new_user)
        db.session.add_all(users)

        tarots = []
        for tarot in tarot_dicts:
            image_url = tarot["image_url"]
            name = tarot["name"]
            description = tarot["description"]
            fortune = tarot["fortune"]

            new_tarot = Tarot(
                name=name,
                image_url=image_url,
                description=description,
                fortune=fortune
            )
            tarots.append(new_tarot)
        db.session.add_all(tarots)

        posts = []
        for i in range(20):
            user_id = randint(1,10)
            content = fake.paragraph(nb_sentences=3)
            title = fake.catch_phrase()

            new_post = Post(
                title = title,
                content = content,
                user_id = user_id
            )

            posts.append(new_post)
        db.session.add_all(posts)
        
        comments = []
        for i in range(60):
            tarot_id = None
            post_id = None
            coin_flip = randint(0,1)
            if coin_flip == 0:
                tarot_id = randint(1,23)
            elif coin_flip == 1:
                post_id = randint(1,10)

            user_id = randint(1,10)
            content=fake.catch_phrase()

            new_comment = Comment(
                user_id=user_id, 
                post_id=post_id, 
                tarot_id=tarot_id, 
                content=content
                )
            
            comments.append(new_comment)
        db.session.add_all(comments)

        db.session.commit()

        print("Seeding complete!")