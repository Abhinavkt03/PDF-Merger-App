// merge.mjs

import PDFMerger from 'pdf-merger-js';

const merger = new PDFMerger();

const mergePdfs = async (p1, p2) => {
  await merger.add(p1);
  await merger.add(p2);

  await merger.setMetadata({
    producer: 'Abhinav',
    author: 'Abhinav Tayal',
    creator: 'Abhinav Tayal',
    title: 'Project'
  });
  let d = new Date().getTime();
  await merger.save(`public/${d}.pdf`);
  return d;
};

export { mergePdfs };
