import { useState } from 'react';
import Tag from '@/components/Tag';

function GenerationFilter() {
  const [selected, setSelected] = useState('전체');
  const tags = ['전체', '7기', '6기', '5기', '4기', '3기', '2기', '1기'];

  return (
    <div className="flex gap-2 lg:gap-4 overflow-x-auto scrollbar-hide">
      {tags.map((tag) => (
        <Tag
          key={tag}
          label={tag}
          isActive={selected === tag}
          onClick={() => setSelected(tag)}
        />
      ))}
    </div>
  );
}

export default GenerationFilter;
