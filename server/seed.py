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



    
    "You are The Lovers! Love is your language, and you find joy in the smallest things. Many describe you as the highlight of any social gathering, and they would absolutely be correct. Despite your social leaning, you have no trouble with solitude. After all, you're never truly alone. Such is the boon of being two people trapped in a single body.",
    "You are The Chariot! You're fast. Like, SO fast. You can outrun most cars on foot. You joined your school's track and field team, but got kicked out for cheating after you completed a 100m dash in 3.2 seconds. Scientists have studied you for thousands of hours and they still have no idea why you're so fast. But no matter how fast you run, you can't outrun the demons inside.",

    "You are The Hermit! You would like to be left alone, please. No solicitors. You'll open the door for packages and food, and that's it. You haven't answered a phone call in 14 years. One time, you slept for 19 hours straight, and you think about that at least twice a day.",
    "You are The Wheel of Fortune! You are the coolest person around. If you don a leather jacket and sunglasses, odds are good that everyone within 30 feet of you will immediately die from the sheer coolness emenating from your body. So, uh, please don't do that. You're cool enough as is.",
    "You are Strength! Indomitable, powerful, utterly massive. In your element. You cannot be shaken by any mortal's actions. Mountains crumble between your fists and seas part around your legs. If you see The Magician, I beg you, do not fight them. Such a clash could very well destroy the world.",
    "You are The Hanged Man! Well, not literally. As The Hanged Man, you are a completely normal person. However, should you tell anyone that you are The Hanged Man, they will always make the same joke: \"Oh wow! I didn't know you'd been hanged before. How are you still alive?\" Being The Hanged Man is a curse. Go hang out with The Hermit, if you can.",
    "You are Death! Don't let the title fool you; being Death isn't nearly as dire as it sounds. It is your job to bring about the end of things. Not all of reality, nor of lives. You simply bring about the end of parts of peoples' lives. Relationships, depression, peace; you enact the end of all sections of the lives of those around you. Maybe you could try starting something sometime, huh? Always ending things has got to be a drag.",
    
    "You are The Tower! You are very tall. Very tall. Nine feet on a good day, ten on a great one. Basketball is trivial for you. There is no shelf you cannot reach. You cannot walk through any building except for a warehouse. Firefighters have had to rescue cats from your shoulders more than once. The weather is actually quite nice up there, though!",

    "You are Judgement! You like to watch. Silently, usually. You don't have much to say. But you do have a lot to think. Many thoughts about all around you, all you see, and all you hear. Your thoughts echo in your mind, reflecting off of one another without any dilution from outside input. They become twisted and deformed, barbed with hate for those around you who you merely choose to observe rather than to understand. Years go by, and these thoughts condense into words. Your tongue too weak to utter them aloud, you turn to the internet, releasing the crystalized essence of your mind upon the helpless denizens of the internet behind the shield of anonymity. \n\"u r suck\"",
    "You are The World! For all those near to you, you are everything. Without you, they would have nothing. You organize events, make friends, and offer any kind of support you can to those in need. You are a true blessing to your community. If The Magician and Strength ever fight, you will instantly die.",
    "You are Hatsune Miku! Congratulations on being a world famous virtual pop star! I'm actually a huge fan! Can I get your autograph? No? Oh. Well, that's ok. Yeah. Thanks for coming by."
]
    
tarot_fortunes = [

]

tarot_images = [

]

tarots = []

for tarot in tarot_names:
    new_tarot = {
        "name": tarot,

    }

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
        for name in tarot_names:
            image_url = "https://cdn.discordapp.com/attachments/661313314671951903/1097715343297872005/zwev93eeu4451.png"
            description = f"Description: {fake.paragraph(nb_sentences=10)}"
            fortune = f"Fortune: {fake.catch_phrase()}"

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