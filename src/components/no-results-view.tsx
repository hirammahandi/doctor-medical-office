export const NoResultsView = () => {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center text-foreground">
      <div className="space-y-4 text-center">
        <h2 className="text-2xl font-bold">No results found</h2>
        <p className="text-muted-foreground">
          Apparently no results with this search criteria were found.
        </p>
      </div>
    </div>
  );
};
