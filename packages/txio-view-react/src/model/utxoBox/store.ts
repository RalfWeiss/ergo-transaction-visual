// import create from "zustand";
import { Article } from "./article";
// import { normalizedArticles } from "./fixtures";
// import { produce } from "immer";

export interface Store {
  articles: Record<string, Article>;
}

// const useStore = create<Store>((set) => ({
//   // articles: {
//   //   [normalizedArticles[0].id]: normalizedArticles[0]
//   // }
//   articles: produce({}, (draft) => {
//     draft[normalizedArticles[0].id] = normalizedArticles[0];
//   }),
//   // addArticle: (article:typeof Article) => set((state) => ({
//   //   articles: state.articles.set(article.displayName, article)
//   // }))
// }));

// use it as an initial list of articles to render

// export const INITIAL_STATE = {
//   articles: defaultArticles,
//   allArticles: defaultArticles.keySeq(),
//   addArticle: (article) => set((state:typeof INITIAL_STATE) => {
//       return state
//   })
// };

// const useStore = create<Store>((set) => ({
//   bears: 0,
//   renderCount: 0,
//   unmountCount: 0,
//   increasePopulation: () => set((state) => ({ bears: state.bears + 1 })),
//   removeAllBears: () => set({ bears: 0 }),  // set function merges state

//   incRenderCount: () =>
//     set(
//       R.evolve({
//         renderCount: R.inc,
//       })
//     ),
//   incUnmountCount: () =>
//     set(
//       R.evolve({
//         unmountCount: R.inc,
//       })
//     ),

//   setBears: (count: number) => set(R.assoc("bears")(count))
// }));
