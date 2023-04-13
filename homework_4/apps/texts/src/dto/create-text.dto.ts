export class CreateTextDto {
  readonly uniqueStringId: string;
  readonly title: string;
  readonly content: string;
  readonly group: string;
  readonly userId: number;
}
