export default ({ name, logo, description }) => {
  return (
    <div className="bg-white rounded-2xl p-4 shadow-sm hover:shadow-md transition-shadow duration-300 border border-gray-100">
      <div className="aspect-[4/3] rounded-xl overflow-hidden mb-4 flex items-center justify-center bg-gray-50 border border-gray-100">
        <img 
          src={logo} 
          alt={`${name} logo`} 
          className="w-full h-full object-cover"
        />
      </div>
      
      <div className="px-1">
        <h3 className="font-bold text-gray-900 text-sm uppercase mb-2 tracking-tight">
          {name}
        </h3>
        <p className="text-gray-600 text-xs leading-relaxed line-clamp-2">
          {description}
        </p>
      </div>
    </div>
  );
};