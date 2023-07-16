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

let mCurrentId = 3;
let currentId = 3;

let todoDatabase = [
  {
      id: 1,
      action: 'Make your bed.',
      isCompleted: false,
  },
  {
      id: 2,
      action: 'Brush your teeth',
      isCompleted: false,
  }
]

const getList = (req, res) => {
  res.status(200).send(todoDatabase)
}


const addAction = (req, res) => {
  newItem = {
      id: currentId,
      action: req.body.action,
      isCompleted: false
  }
  if (todoDatabase.length < 21) {
      todoDatabase.push(newItem)
      currentId++
      res.status(200).send(todoDatabase)
  } else {
      res.status(500).send(todoDatabase)
  }
}


const toggleCompleteAction = (req, res) => {
  todoDatabase.forEach(element => {
      if (+req.params.id === element.id) {
          element.isCompleted = !element.isCompleted
      }
  })
  res.status(200).send(todoDatabase)
}

const deleteAction = (req, res) => {
  if (req.query.id) {
      todoDatabase.forEach((element, i) => {
          if (+req.query.id === element.id) {
              todoDatabase.splice(i, 1)
          }
      })
  } else {
      todoDatabase = []
  }
  res.status(200).send(todoDatabase)
}

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
      id: mCurrentId,
      quote: req.body.quote,
      likes: 0,
    };
    motivationDB.push(newQuote);
    mCurrentId++;
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
  getList, addAction, toggleCompleteAction, deleteAction
};
