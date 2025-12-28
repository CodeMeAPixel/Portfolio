declare module 'gray-matter' {
  interface GrayMatterOption<I extends GrayMatterOption.Input, O extends GrayMatterOption.Output> {
    parser?: () => void;
    eval?: boolean;
    excerpt?: boolean | ((input: I, options: GrayMatterOption<I, O>) => string);
    excerpt_separator?: string;
    engines?: {
      [index: string]: (input: string) => object;
    };
    language?: string;
    delimiters?: string | [string, string];
  }

  namespace GrayMatterOption {
    type Input = string | Buffer;
    type Output = string | Buffer | object;
  }

  interface GrayMatterFile<I extends GrayMatterOption.Input> {
    data: { [key: string]: any };
    content: string;
    excerpt?: string;
    orig: Buffer | I;
    language: string;
    matter: string;
    stringify(lang: string): string;
  }

  function matter<I extends GrayMatterOption.Input, O extends GrayMatterOption.Output>(
    input: I,
    options?: GrayMatterOption<I, O>
  ): GrayMatterFile<I>;

  namespace matter {
    function read<O extends GrayMatterOption.Output>(
      fp: string,
      options?: GrayMatterOption<string, O>
    ): GrayMatterFile<string>;

    function stringify<O extends GrayMatterOption.Output>(
      file: string | GrayMatterFile<string>,
      data: object,
      options?: GrayMatterOption<string, O>
    ): string;

    function test(str: string, options?: GrayMatterOption<string, string>): boolean;

    const language: (name: string, lang: (str: string) => object) => void;
  }

  export = matter;
}
