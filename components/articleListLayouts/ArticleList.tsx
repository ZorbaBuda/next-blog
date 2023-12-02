
import  ArticleCard  from '../cards/ArticleCardInList';

function ArticleList({
  articles,
  showEndMessage = false,
  fullHeight = false
}) {
  return (
    <div className={`mt-10 space-y-12 ${fullHeight && 'min-h-screen '}`}>
      <div className=" mx-auto grid grid-cols-1 gap-16  md:grid-cols-1 lg:grid-cols-1">
        {articles.map((post ) => (
        <ArticleCard key={post.title}  post={post} />
        ))}
      </div>
      {showEndMessage && (
        <div className="flex items-center justify-center  text-lg text-slate-950 dark:text-slate-300">
          <p>Fin de la lista</p>
         
        </div>
      )}
    </div>
  );
}

export default ArticleList;
