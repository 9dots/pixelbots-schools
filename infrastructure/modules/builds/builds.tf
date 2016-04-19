resource "aws_s3_bucket" "builds" {
  bucket = "${var.bucket}"
  acl = "private"
}
