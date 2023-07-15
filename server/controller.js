let motivationDB = [
  {
    id: 1,
    quote: "Life is 10% what happens to you and 90% how you react to it.",
    likes: 0,
  },
  {
    id: 2,
    quote: "Change your thoughts, and you change your world.",
    likes: 0,
  },
];

let currentId = 3;

module.exports = {
  getCompliment: (req, res) => {
    const compliments = [
      "Gee, you're a smart cookie!",
      "Cool shirt!",
      "Your Javascript skills are stellar.",
    ];

    // choose random compliment
    let randomIndex = Math.floor(Math.random() * compliments.length);
    let randomCompliment = compliments[randomIndex];

    res.status(200).send(randomCompliment);
  },

  getFortune: (req, res) => {
    const fortunes = [
      "A person of words and not deeds is like a garden full of weeds.",
      "A soft voice may be awfully persuasive.",
      "All the effort you are making will ultimately pay off.",
      "An inch of time is an inch of gold.",
      "Any decision you have to make tomorrow is a good decision.",
      "If you’re feeling down, try throwing yourself into your work.",
      "New ideas could be profitable.",
      "Do not let ambitions overshadow small success.",
    ];

    let randomIndex = Math.floor(Math.random() * fortunes.length);
    let randomfortune = fortunes[randomIndex];

    res.status(200).send(randomfortune);
  },
  getMotivationAlert: (req, res) => {
    const motivations = [
      "We cannot solve problems with the kind of thinking we employed when we came up with them.",
      "We cannot solve problems with the kind of thinking we employed when we came up with them.",
      "Stay away from those people who try to disparage your ambitions. Small minds will always do that, but great minds will give you a feeling that you can become great too.",
      "When you give joy to other people, you get more joy in return. You should give a good thought to happiness that you can give out.",
      "When you change your thoughts, remember to also change your world.",
      "It is only when we take chances, when our lives improve. The initial and the most difficult risk that we need to take is to become honest.",
    ];

    let randomIndex = Math.floor(Math.random() * motivations.length);
    let randomMotivations = motivations[randomIndex];

    res.status(200).send(randomMotivations);
  },

  put: () => {},

  addMotivationQuote: (req, res) => {
    newQuote = {
      id: currentId,
      quote: req.body.quote,
      likes: 0,
    };
    motivationDB.push(newQuote);
    currentId++;
    res.status(200).send(motivationDB);
  },

  deleteQuote: (req, res) => {
    motivationDB.forEach((element, i) => {
      if (+req.params.id === element.id) {
        motivationDB.splice(i, 1);
      }
    });
    res.status(200).send(motivationDB);
  },

  //add likes and dislikes button
  //set event listener when clicked it increments or decrements.
  //use params type
  //Pass in string of corresponding type for each like and dislike button function param.

  handleReaction: (req, res) => {
    const { type, id } = req.params;
    motivationDB.forEach((element) => {
      if(+id === element.id){
      if (type === "like") {
        element.likes++;
      } else if (type === "dislike"){
        element.likes--;
      }
    }
    });
    res.status(200).send(motivationDB);
  },
};
