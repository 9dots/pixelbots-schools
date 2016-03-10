resource "aws_s3_bucket" "tfstate" {
  bucket = "${var.bucket}"
  acl = "private"
}
