import React from 'react';

class QuoteGenerator extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            quote: "All warfare is based on deception.",
            attribution: "孫子 (Sunzi)"
        }
        // I got many of these quotes from https://totalwar.fandom.com/wiki/Loading_Screen_Quotes_%28Rome:_Total_War%29
        //a few from https://jeroen-de-flander.com/strategy-quotes-update/
        //more from https://www.goodreads.com/quotes/tag/strategy
        this.quotes = [
            { quote: "All warfare is based on deception.", attribution: "孫子 (Sun Tzu)" },
            { quote: "An ambuscade, if discovered and promptly surrounded, will repay the intended mischief with interest.", attribution: "Vegetius" },
            { quote: "Quick decisions are unsafe decisions.", attribution: "Sophocles" },
            { quote: "To a good general luck is important.", attribution: "Livy" },
            { quote: "Victory loves prudence.", attribution: "Latin Proverb" },
            { quote: "The desire for safety stands against every great and noble enterprise.", attribution: "Tacitus" },
            { quote: "A good general not only sees the way to victory, he also knows when victory is impossible.", attribution: "Polybius" },
            { quote: "Adversity reveals the genius of a general; good fortune conceals it.", attribution: "Horace" },
            { quote: "When there is mutual fear, men think twice before they make aggression upon one another.", attribution: "Hermocrates" },
            { quote: "The god of war hates those who hesitate.", attribution: "Euripides" },
            { quote: "It is right to learn, even from the enemy.", attribution: "Ovid" },
            { quote: "War, as the saying goes, is full of false alarms.", attribution: "Aristotle" },
            { quote: "He is best secure from dangers who is on his guard even when he seems safe.", attribution: "Pulibius Syrus" },
            { quote: "It is a bad plan that cannot be altered.", attribution: "Pulibius Syrus" },
            { quote: "In war important events result from trivial causes.", attribution: "Gaius Julius Caesar" },
            { quote: "I am more afraid of our own mistakes than of our enemies' designs.", attribution: "Pericles" },
            { quote: "If a man does not strike first, he will be first struck.", attribution: "Athenogoras of Syracuse" },
            { quote: "Hannibal knew how to gain a victory, but not how to use it.", attribution: "Maharbal" },
            { quote: "The man who runs away will fight again.", attribution: "Menander" },
            { quote: "Divide and conquer.", attribution: "Military Maxim" },
            { quote: "However beautiful the strategy, you should occasionally look at the results.", attribution: "Sir Winston Churchill" },
            { quote: "Strategy is a pattern in a stream of decisions.", attribution: "Henry Mintzberg" },
            { quote: "Perception is strong and sight weak. In strategy it is important to see distant things as if they were close and to take a distanced view of close things.", attribution: "Miyamoto Musashi" },
            { quote: "Strategy without tactics is the slowest route to victory, tactics without strategy is the noise before defeat.", attribution: "孫子 (Sun Tzu)" },
            { quote: "Never interrupt your enemy when he is making a mistake.", attribution: "Napoleon Bonaparte" },
            { quote: "In preparing for battle I have always found that plans are useless, but planning is indispensable.", attribution: "Dwight D. Eisenhower" },
            { quote: "We do not place especial value on the possession of a virtue until we notice its total absence in our opponent.", attribution: "Friedrich Nietzsche" },
            { quote: "Attack is the secret of defense; defense is the planning of an attack.", attribution: "孫子 (Sun Tzu)" },
            { quote: "You’ve got to think about big things while you’re doing small things, so that all the small things go in the right direction.", attribution: "Alvin Toffler" },
            { quote: "If your enemy offers you two targets, strike at a third.", attribution: "Robert Jordan" },
            { quote: "Never forget the potential one solitary pawn has to change the entire game.", attribution: "Aimee Carter" },
            { quote: "Any man who retreats into a cave which has only one opening deserves to die.", attribution: "Frank Herbert" },
            { quote: "Every advantage is temporary.", attribution: "Katerina Stoykova Klemer" }
            
        ]
        this.handleChangeQuote = this.handleChangeQuote.bind(this)
    }
    handleChangeQuote() {
        //randomly select quote
        let new_quote = this.quotes[Math.floor((Math.random() * this.quotes.length))];
        //if we random previous quote, redo
        while (this.state.quote === new_quote.quote) {
            new_quote = this.quotes[Math.floor((Math.random() * this.quotes.length))];
        }
        //update the state
        this.setState({
            quote: new_quote.quote,
            attribution: new_quote.attribution
        })
    }
    componentDidMount(){
        setInterval(this.handleChangeQuote,20000) //changes every 20 seconds
    }

    render() {
        return (
            <div id="quote-generator">
                <div id="quote-box">
                    <h2 id="text">"{this.state.quote}"</h2>
                    <h3 id="author">-{this.state.attribution}</h3>
                </div>
            </div>

        )
    }
};

export default QuoteGenerator;