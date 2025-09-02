<?php

namespace App\Services;

use Exception;
use PhpOffice\PhpWord\Element\Text;
use PhpOffice\PhpWord\Element\TextRun;
use PhpOffice\PhpWord\IOFactory as WordIOFactory;
use Smalot\PdfParser\Parser as PdfParser;

class FileConverterService
{
    public function convertToText($file): string
    {
        $extension = strtolower($file->getClientOriginalExtension());
        $path = $file->getRealPath();

        return match ($extension) {
            'pdf' => $this->convertPdfToText($path),
            'doc', 'docx' => $this->convertWordToText($path),
            'txt' => file_get_contents($path),
            default => throw new Exception("Unsupported file type: .$extension"),
        };
    }

    private function convertPdfToText(string $path): string
    {
        $parser = new PdfParser;
        $pdf = $parser->parseFile($path);

        return $pdf->getText();
    }

    private function convertWordToText(string $path): string
    {
        $phpWord = WordIOFactory::load($path);
        $text = '';

        foreach ($phpWord->getSections() as $section) {
            foreach ($section->getElements() as $element) {
                // Direct text
                if ($element instanceof Text) {
                    $text .= $element->getText()."\n";
                }
                // TextRun (multiple text parts)
                elseif ($element instanceof TextRun) {
                    foreach ($element->getElements() as $child) {
                        if ($child instanceof Text) {
                            $text .= $child->getText();
                        }
                    }
                    $text .= "\n";
                }
            }
        }

        return $text;
    }
}
