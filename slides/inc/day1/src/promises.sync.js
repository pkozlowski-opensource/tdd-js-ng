// slide:start:2actors;
      try {
        pawel.eat(pizzaPit.takeOrder('Margherita'));
      } catch (e) {
        pawel.beHungry(e.msg);
      }
// slide:end;

// slide:start:cbaggregation;
      try {
        var pizza = pizzaPit.takeOrder('Margherita');
        pawel.eat(pizza);
        pete.eat(pizza);
      } catch (e) {
        pawel.beHungry(e.msg);
        pete.beHungry(e.msg);
      }
// slide:end;

// slide:start:chain;
      try {
        pawel.eat(slice(pizzaPit.takeOrder('Margherita')));
      } catch (e) {
        pawel.beHungry(e.msg);
      }
// slide:end;

// slide:start:recover;
      try {
        pawel.eat(pizzaPit.takeOrder('Capricciosa'));
      } catch (e) {
        pawel.eat(pizzaPit.takeOrder('Margherita'));
      }
// slide:end;

// slide:start:reject;
      try {
        pawel.eat(pizzaPit.takeOrder('Capricciosa'));
      } catch (e) {
        throw new Exception('ordered pizza not available');
      }
// slide:end;