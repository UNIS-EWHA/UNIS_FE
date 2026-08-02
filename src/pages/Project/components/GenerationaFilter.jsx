import Tag from '@/components/Tag';

const tags = ['전체', '7기', '6기'];

function GenerationFilter({ selected, onSelect }) {
  return (
    <div className="flex gap-2 lg:gap-4 overflow-x-auto scrollbar-hide">
      {tags.map((tag) => (
        <Tag
          key={tag}
          label={tag}
          isActive={selected === tag}
          onClick={() => onSelect(tag)}
        />
      ))}
    </div>
  );
}

export default GenerationFilter;
