function Skeleton() {
  return (
    <div>
      <div className="w-full aspect-[7/11] skeleton-loader bg-slate-200"></div>
      <div className="w-1/2 h-[25px] bg-slate-200 skeleton-loader rounded-md my-3"></div>
      <div className="w-full h-[44px] bg-slate-200 skeleton-loader rounded-md"></div>
    </div>
  );
}

export default Skeleton;
