# Standard library imports
from random import randint, choice as rc

# Remote library imports
from faker import Faker

# Local imports
from app import app
from models import db, User, Comment, Post, Tarot

# TAROTS TO DO:
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
            password = "test"

            new_user = User(username=username, email=email, password_hash=password)
            users.append(new_user)
        db.session.add_all(users)

        tarots = []
        for name in tarot_names:
            image_url = None
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

            new_post = Post(
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