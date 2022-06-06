/*
Records always have a value for the keys they define. Removing a key from the record simply resets it to the default value for that key. By doing this, we get a guaranteed structure of your data (articles), and it will always be specially arranged.

OrderedMap is a type of Map, which has the additional guarantee that the iteration order of entries will be the order in which they were set(). Let us create OrderedMap using this Article record.
*/

// define article record
export interface Article {
  id: string;
  date: string;
  title: string;
  text: string;
  comments: string[];
}
